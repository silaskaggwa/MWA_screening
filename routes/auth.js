const express = require('express');
const router = express.Router();
const UserService = require('../services/user');
const MailService = require('../services/mail');
const AuthService = require('../services/authentication');

router.post('/', (req, res) => {
    UserService.getUserByEmail(req.body.email)
        .then(user => {
            if(user){
                AuthService.generate({id: user._id}).then(token => {
                    MailService.sendLoginEmail(user.name, user.email, token);
                });
                res.status(200).json({status: 'success'});
            }else{
                res.status(404).json({status: 'unauthorized'});
            }
        })
        .catch(err => {
            throw err;
        });
    });

router.get('/verify', (req, res) => {
    UserService.getUserById(req.user.id)
        .then(user => {
            if(user){
                AuthService.generate({id: req.user.id}).then(token => {
                    res.cookie('id_token', token, {expire: config.exam.duration*60000});
                    if(user.role == 'admin'){
                        return res.redirect('/admin');
                    }else{
                        return res.redirect('/staff');
                    }
                });
            }else{
                res.status(403).json('unauthorized');
            }
            
        })
        .catch(err => {
            res.status(403).json(err);
        });
    });

module.exports = router;