const express = require("express");
var router = express.Router({ mergeParams: true }),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    fs = require('fs'),
    path = require('path'),
    User = require('../models/user'),
    Invite = require('../models/invite'),
    dotenv = require('dotenv');
dotenv.config();

// @route to render invite share page
router.get('/invite/:fid', (req, res) => {
    User.findOne({ _id: req.params.fid }, (err, fuser) => {
        if (err) {
            res.send(err);
        } else {
            if (fuser != null) {
                res.render("invite/index", { user: fuser });
            } else {
                req.flash("error", "no such game");
            }
        }
    })
})

// @post route to submit invite index page
router.post('/invite/new/:fid', (req, res) => {
    User.findOne({ email: req.body.email }, (err, fuser) => {
        if (err) {
            res.send(err);
        } else {
            if (fuser == null) {
                const user = {
                    username: req.body.name,
                    email: req.body.email
                }
                User.create(user, (err, nuser) => {
                    if (err) {
                        res.send(err);
                    } else {
                        User.findOne({ _id: req.params.fid }, (err, fuser) => {
                            if (err) {
                                res.send(err);
                            } else {
                                if (fuser != null) {
                                    res.redirect('/invite/form/' + nuser._id + '/' + fuser._id);
                                } else {
                                    req.flash("error", "no such invitation");
                                    res.redirect('/');
                                }
                            }
                        })

                    }
                })
            } else {
                req.flash("error", "email already exists");
                res.redirect('/');
            }
        }
    })
})

// @route to render invite ques-ans form
router.get('/invite/form/:uid/:fid', (req, res) => {
    Invite.findOne({ userid: req.params.fid, friendid: req.params.uid }, (err, finvite) => {
        if (err) {
            res.send(err);
        } else {
            if (finvite == null) {
                User.findOne({ _id: req.params.uid }, (err, fuser) => {
                    if (err) {
                        res.send(err);
                    } else {
                        if (fuser != null) {

                            User.findOne({ _id: req.params.fid }, (err, ffriend) => {
                                if (err) {
                                    res.send(err);
                                } else {
                                    if (ffriend != null) {
                                        res.render('invite/form', { user: fuser, friend: ffriend });
                                    } else {
                                        req.flash("error", "no such invite");
                                        res.redirect('/user/form/' + fuser._id);
                                    }
                                }
                            })

                        } else {
                            req.flash("error", "no such account");
                            res.redirect('/');
                        }

                    }
                })
            } else {
                res.redirect('/invite/results/' + req.params.uid + "/" + req.params.fid + '/' + finvite._id);
            }
        }
    })

})

// @post route to submit and compare invite form q-a
router.post('/invite/form/:uid/:fid', (req, res) => {
    User.findOne({ _id: req.params.uid }, (err, fuser) => {
        if (err) {
            res.send(err);
        } else {
            if (fuser != null) {
                User.findOne({ _id: req.params.fid }, (err, ffriend) => {
                    if (err) {
                        res.send(err);
                    } else {
                        if (ffriend != null) {
                            const invite = {
                                friendname: fuser.username,
                                friendid: fuser._id,
                                username: ffriend.username,
                                userid: ffriend._id
                            }
                            Invite.create(invite, (err, ninvite) => {
                                if (err) {
                                    res.send(err)

                                } else {
                                    // compare answers and update invite
                                    invite.save();
                                    res.redirect('/invite/results/' + fuser._id + '/' + ffriend._id + '/' + ninvite._id);
                                }

                            })
                        } else {
                            req.flash("error", "no such invitation");
                            res.redirect('/user/form/' + fuser._id);
                        }
                    }
                })
            } else {
                req.flash('error', "no such account");
                res.redirect('/');
            }
        }
    })
})

// @results route
router.get('/invite/results/:uid/:fid/:iid', (req, res) => {
    User.findOne({ _id: req.params.uid }, (err, fuser) => {
        if (err) {
            res.send(err);
        } else {
            if (fuser != null) {
                User.findOne({ _id: req.params.fid }, (err, ffriend) => {
                    if (err) {
                        res.send(err);
                    } else {
                        if (ffriend != null) {
                            Invite.findOne({ _id: req.params.iid }, (err, finvite) => {
                                if (err) {
                                    res.send(err);
                                } else {
                                    if (finvite != null) {
                                        Invite.find({userid:ffriend._id},(err,finvites)=>{
                                            if(err){
                                                res.send(err);
                                            }else{
                                                res.render('invite/results', {invites:finvites, invite: finvite, user: fuser, friend: ffriend });
                                            }
                                        })
                                        
                                    } else {
                                        req.flash('error', "no such invite");
                                        res.redirect('/invite/form/' + fuser._id + '/' + ffriend._id);
                                    }
                                }
                            })
                        } else {
                            req.flash("error", "no such invitation");
                            res.redirect('/user/form/' + fuser._id);
                        }
                    }
                })
            } else {
                req.flash('error', "no such account");
                res.redirect('/');
            }
        }
    })
})









module.exports = router;