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

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// @route to post new user
router.post('/user/new', (req, res) => {
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
                        nuser.sharelink = "http://gamestickman.herokuapp.com/invite/" + nuser._id;
                        nuser.save();
                        res.json({
                            getredirect: "/user/form/" + nuser._id
                        });
                    }
                })
            } else {

                res.json({
                    getredirect: "/user/form/" + fuser._id
                });
            }
        }
    })
})

// @route to render form to a user
router.get('/user/form/:id', (req, res) => {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        User.findOne({ _id: req.params.id }, (err, fuser) => {
            if (err) {
                res.send(err);
            } else {
                if (fuser != null) {
                    if (fuser.qa.length>1) {
                        // res.render('user/form',{id:fuser._id});
                        res.json({
                            render: "form page",
                            user: fuser
                        });
                    } else {
                        // res.redirect('/user/share/'+fuser._id);
                        res.json({
                            getredirect: "/user/share/" + fuser._id
                        });
                    }

                } else {
                    // req.flash("error","please enter details");
                    res.json({
                        getredirect: "/"
                    });
                }
            }
        })
    } else {
        // res.redirect('/');
        res.json({
            getredirect: "/"
        });
    }

})

// @route to post form data for a user
router.post('/user/form/:id', (req, res) => {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        User.findOne({ _id: req.params.id }, (err, fuser) => {
            if (err) {
                res.send(err);
            } else {
                if (fuser != null) {
                    fuser.qa = req.body.qa;
                    fuser.save();
                    // res.redirect('/user/share/'+fuser._id);
                    res.json({
                        getredirect: "/user/share/" + fuser._id
                    });
                } else {
                    // res.redirect('/');
                    res.json({
                        getredirect: "/"
                    });
                }
            }
        })

    } else {
        // res.redirect('/')
        res.json({
            getredirect: "/"
        });
    }
})

// @share page for user
router.get('/user/share/:id', (req, res) => {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        // console.log(req.params.id)
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        User.findOne({ _id: req.params.id }, (err, fuser) => {
            if (err) {
                res.send(err);
            } else {
                if (fuser != null) {
                    // console.log(fuser)
                    Invite.find({ userid: req.params.id }, (err, finvites) => {
                        if (err) {
                            res.send(err);
                        } else {
                            res.json({
                                render: "share page",
                                user:fuser,
                                invites:finvites
                            })
                            // res.render('share page')
                        }
                    })
                } else {
                    // res.redirect('/');
                    res.json({ 
                        getredirect:"/"
                     });
                }
            }
        })
    } else {
        //res.redirect('/');
        res.json({ getredirect:"/" });
    }

})
// @route to delete quiz and start new quiz
router.post('/user/delete/:id', (req, res) => {
    User.findOne({ _id: req.params.id }, (err, fuser) => {
        if (err) {
            res.send(err);
        } else {
            fuser.qa = [];
            fuser.save();
            Invite.remove({ userid: req.params.id }, (err) => {
                if (err) {
                    res.send(err);
                } else {
                    // res.redirect('/user/form/'+fuser._id);
                    res.json({ getredirect:"/user/form/"+fuser._id })
                }
            })
        }
    })
})

// @route to delete scoreboard row for user
router.post('/user/delete/invite/:inviteid/:uid', (req, res) => {
    Invite.remove({ _id: req.params.inviteid }, (err) => {
        if (err) {
            res.send(err);
        } else {
            // res.redirect('/user/share/'+req.params.uid);
            res.json({ 
                getredirect:"/user/share/"+req.params.uid
             })
        }
    })
})









module.exports = router;