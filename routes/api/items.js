const router = require('express').Router();
const auth = require('../../middleware/auth');

 // Item Model
 const Item = require('../../models/item.model');

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error: ' + err));
});

// @route   POST api/items
// @desc    Create An Item
// @access  Private
router.post('/', auth, (req, res) => {
    const name = req.body.name;
    const newItem = new Item({name})

    newItem.save()
        .then(item => res.json(item))
        .catch(err => res.status(400).json('Error: ' + err));
});

// @route   DELETE api/items/:id
// @desc    Delete An Item
// @access  Private
router.delete('/:id', auth, (req, res) => {
    Item.findByIdAndDelete(req.params.id)
        .then(() => res.json({ success: true}))
        .catch(err => res.status(404).json({ success: false }));
});

 module.exports = router;