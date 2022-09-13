const connection = require('../database/connection');
const { ObjectId } = require('mongodb');

class list {
    static all = (req, res) => {
        connection((err, db) => {
            db.collection('list').find().toArray((e, list) => {
                if (e) return res.redirect('/error404');
                list.forEach((d, i) => d.count = i + 1);
                res.render('home', { pageTitle: 'Home Page', data: list} );
            });
        });
    }
    static add = (req, res) => {
        const data = req.body;
        if (data.do === '' || data.do === ' ') return res.redirect('/error404');
        connection((err, db) => {
            if (err) return res.render('error404', {pageTitle: 'Error Data',pageContent:err.message});
            db.collection('list').insertOne(data)
            .then(() => res.redirect('/'))
            .catch(err => res.send(err.message))
        });
    }
    static del = (req, res) => {
        connection((err, db) => {
            if (err) return res.render('error404', {pageTitle: 'Page Error',pageContent:'Error Id'});
            db.collection('list').findOneAndDelete({_id: new ObjectId(req.params.id)})
            .then(() => res.redirect('/'))
            .catch(er => res.redirect('/error404'))
        });
    }
    static edit = (req, res) => {
        connection((err, db) => {
            if (err) return res.render('error404', {pageTitle: 'Page Error',pageContent:'Error Id'});
            db.collection('list').findOne({_id: new ObjectId(req.params.id)})
            .then((list) => {
                res.render('home', {list:list})
            })
            .catch(er => res.redirect('/error404'))
        });
    }
    static editLogic = (req, res) => {
        const data = req.body;
        if (data.do === '' || data.do === ' ') return res.redirect('/error404');
        connection((err, db) => {
            if (err) return res.render('error404', {pageTitle: 'Error Data',pageContent:err.message});
            db.collection('list').findOneAndUpdate({_id: new ObjectId(req.params.id)}, {$set: data})
            .then(() => res.redirect('/'))
            .catch(err => res.send(err.message))
        });
    }
    static search = (req, res) => {
        connection((err, db) => {
            db.collection('list').find({do: {$regex: `${req.query.search}`}}).toArray((e, list) => {
                if (e) return res.redirect('/error404');
                list.forEach((d, i) => d.count = i + 1);
                const search = true;
                res.render('home', { pageTitle: 'Home Page', data: list, search} );
            });
        });
    }
}

module.exports = list;