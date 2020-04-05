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
    console.log("meme")
    if (req.params.fid.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        User.findOne({ _id: req.params.fid }, (err, fuser) => {
            if (err) {
                res.send(err);
            } else {
                //console.log("inside findone" + fuser)

                if (fuser != null) {
                    if (fuser.qa == []) {
                        // console.log("hello")
                        req.flash("error", "no quiz now");
                        // res.redirect('/');
                        res.json({ msg_id: 0 });
                    } else {
                        Invite.find({ userid: fuser._id }, (err, finvites) => {
                            if (err) {
                                res.send(err);
                            } else {
                                // res.render('/invite/new/'+fuser._id);
                                res.json({ user: fuser, invites: finvites });
                            }
                        })

                    }

                } else {
                    // console.log("not found");
                    req.flash("error", "no such game");
                    // res.redirect('/')
                    res.json({ msg_id: 0 });
                }
            }
        })
    } else {
        console.log("no game")
        req.flash("error", "no such game");
        // res.redirect('/')
        res.json({ msg_id: 0 });
    }

})

// @post route to submit invite index page
router.post('/invite/new/:fid', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            res.send(err);
        } else {
            if (user == null) {
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
                        if (req.params.fid.match(/^[0-9a-fA-F]{24}$/)) {
                            // Yes, it's a valid ObjectId, proceed with `findById` call.
                            User.findOne({ _id: req.params.fid }, (err, fuser) => {
                                if (err) {
                                    res.send(err);
                                } else {
                                    if (fuser != null) {
                                        res.json({
                                            curUser: nuser,
                                            friendUser: fuser
                                        });
                                        //res.redirect('/invite/form/' + nuser._id + '/' + fuser._id);
                                    } else {
                                        req.flash("error", "no such invitation");
                                        // res.redirect('/user/'+fuser._id);
                                        res.json({ user: nuser, msg_id: 1 });
                                    }
                                }
                            })

                        } else {
                            req.flash("error", "no such invitation");
                            // res.redirect('/user/'+fuser._id);
                            res.json({ user: nuser, msg_id: 1 });
                        }

                    }
                })
            } else {
                if (req.params.fid.match(/^[0-9a-fA-F]{24}$/)) {
                    // Yes, it's a valid ObjectId, proceed with `findById` call.
                    User.findOne({ _id: req.params.fid }, (err, fuser) => {
                        if (err) {
                            res.send(err);
                        } else {
                            if (fuser != null) {
                                res.json({
                                    curUser: user,
                                    friendUser: fuser
                                });
                                //res.redirect('/invite/form/' + nuser._id + '/' + fuser._id);
                            } else {
                                req.flash("error", "no such invitation");
                                // res.redirect('/user/'+fuser._id);
                                res.json({ user: user, msg_id: 1 });
                            }
                        }
                    })

                } else {
                    req.flash("error", "no such invitation");
                    // res.redirect('/user/'+fuser._id);
                    res.json({ user: user, msg_id: 1 });
                }


            }
        }
    })
})

// @route to render invite ques-ans form
router.get('/invite/form/:uid/:fid', (req, res) => {
    if (req.params.uid == req.params.fid) {
        req.flash("error", "cannot answer your own quiz")
        User.findOne({ _id: req.params.uid }, (err, fuser) => {
            if (err) {
                res.send(err);
            }
            else {
                if (fuser == null)
                    res.json({ msg_id: 0 });
                else {
                    res.json({ user: fuser, msg_id: 1 })

                }
            }
        });

        // res.redirect('/user/'+req.params.uid);
        // console.log("hahah")
    } else {
        if (req.params.fid.match(/^[0-9a-fA-F]{24}$/) && req.params.uid.match(/^[0-9a-fA-F]{24}$/)) {
            // Yes, it's a valid ObjectId, proceed with `findById` call.
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
                                                // res.render('invite/form', { user: fuser, friend: ffriend });
                                                res.json({ user: fuser, friend: ffriend })
                                            } else {
                                                req.flash("error", "no such invite");
                                                // res.redirect('/user/form/' + fuser._id);
                                                res.json({ user: fuser, msg_id: 1 });
                                            }
                                        }
                                    })

                                } else {
                                    req.flash("error", "no such account");
                                    // res.redirect('/');
                                    res.json({ msg_id: 0 });
                                }

                            }
                        })
                    } else {
                        // res.redirect('/invite/results/' + req.params.uid + "/" + req.params.fid + '/' + finvite._id);
                        res.json({ uid: req.params.uid, fid: req.params.fid, iid: finvite, msg_id: 2 })
                    }
                }
            })
        } else {
            // res.redirect('/');
            res.json({ msg_id: 0 });
        }


    }

})

// @post route to submit and compare invite form q-a
router.post('/invite/form/:uid/:fid', (req, res) => {
    if (req.params.uid.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        User.findOne({ _id: req.params.uid }, (err, fuser) => {
            if (err) {
                res.send(err);
            } else {
                if (fuser != null) {
                    if (req.params.fid.match(/^[0-9a-fA-F]{24}$/)) {
                        // Yes, it's a valid ObjectId, proceed with `findById` call.
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
                                            ninvite.ans = req.body;
                                            for (var i = 0; i < ffriend.qa.length; i++) {
                                                ninvite.correctans.push(ffriend.qa[i].ans);
                                                if (ffriend.qa[i].ans == req.body[i]) {
                                                    ninvite.score = ninvite.score + 1;
                                                }
                                            }
                                            if (ninvite.score == 10) {
                                                ninvite.friendtype = "Soul Bond";
                                            } else if (ninvite.score == 9) {
                                                ninvite.friendtype = "Best Friend";
                                            }
                                            else if (ninvite.score == 8) {
                                                ninvite.friendtype = "Partner-in-crime";
                                            } else if (ninvite.score == 7) {
                                                ninvite.friendtype = "Close Freind";
                                            } else if (ninvite.score == 6) {
                                                ninvite.friendtype = "Friendliest Freind";
                                            } else if (ninvite.score == 5) {
                                                ninvite.friendtype = "Reliable Companion";
                                            }else if (ninvite.score == 4) {
                                                ninvite.friendtype = "Casual Friend";
                                            } 
                                            else if (ninvite.score == 3) {
                                                ninvite.friendtype = "Media Buddy";
                                            } else if (ninvite.score == 2) {
                                                ninvite.friendtype = "A Faint Acquaintance";
                                            } else if (ninvite.score == 1) {
                                                friendtype = "More than a stranger";
                                            } else {
                                                ninvite.friendtype = "Let's Catch up";
                                            } 
                                            ninvite.save();

                                            // res.redirect('/invite/results/' + fuser._id + '/' + ffriend._id + '/' + ninvite._id);
                                            //res.json({ uid: fuser._id, fid: ffriend._id, iid: ninvite._id })
                                            res.json({
                                                iid: ninvite,
                                                msg_id: 2
                                            });
                                        }

                                    })
                                } else {
                                    req.flash("error", "no such invitation");
                                    // res.redirect('/user/form/' + fuser._id);
                                    res.json({ user: fuser, msg_id: 1 });
                                }
                            }
                        })
                    } else {
                        req.flash("error", "no such invitation");
                        // res.redirect('/user/form/' + fuser._id);
                        req.json({ user: fuser, msg_id: 1 })
                    }

                } else {
                    req.flash('error', "no such account");
                    // res.redirect('/');
                    res.json({ msg_id: 0 });
                }
            }
        })
    } else {
        // res.redirect('/');
        res.json({ msg_id: 0 });

    }

})

// @results route
router.get('/invite/results/:uid/:fid/:iid', (req, res) => {
    if (req.params.uid.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        User.findOne({ _id: req.params.uid }, (err, fuser) => {
            if (err) {
                res.send(err);
            } else {
                if (fuser != null) {
                    if (req.params.fid.match(/^[0-9a-fA-F]{24}$/)) {
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
                                                Invite.find({ userid: ffriend._id }, (err, finvites) => {
                                                    if (err) {
                                                        res.send(err);
                                                    } else {
                                                        // res.render('invite/results', { invites: finvites, invite: finvite, user: fuser, friend: ffriend });
                                                        res.json({ invite: finvite, invites: finvites, user: fuser, friend: ffriend });
                                                    }

                                                })

                                            } else {
                                                req.flash('error', "no such invite");
                                                // res.redirect('/invite/form/' + fuser._id + '/' + ffriend._id);
                                                res.json({ uid: fuser._id, fid: ffriend._id, msg_id: 2 })
                                            }
                                        }
                                    })
                                } else {
                                    req.flash("error", "no such invitation");
                                    // res.redirect('/user/form/' + fuser._id);
                                    res.json({ user: fuser, msg_id: 1 });
                                }
                            }
                        })
                    } else {
                        req.flash("error", "no such invitation");
                        // res.redirect('/user/form/' + fuser._id);
                        res.json({ user: fuser, msg_id: 1 });
                    }

                } else {
                    req.flash('error', "no such account");
                    // res.redirect('/');
                    res.json({ msg_id: 0 });
                }
            }
        })
    } else {
        req.flash('error', "no such account");
        // res.redirect('/');
        res.json({ msg_id: 0 });
    }

})

module.exports = router;