const express = require("express");
const router = express.Router();
// const User = require('../models/User')
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fecthUser");

// Route 1: fetch all notes using : Get at '/api/notes/fetchAllNotes
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// Route 2 add notes using : POST at '/api/notes/addnotes
router.post(
  "/addnotes",
  fetchUser,
  [
    body("title", "enter a valid title").isLength({ min: 5 }),
    body(
      "description",
      "Description must  be atleast of 5 characters"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // If there are errors, return errors and Bad request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      console.log("success");

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// Route 3 update an existing note using : PUT at '/api/notes/updatenotes

router.put("/updatenotes/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    // Create a newNote Object
    const newNote = {};

    if (title) {
      newNote.title = title;
    }

    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find a note to be updated and update it.

    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// Route 4 Delete an existing note using : DELETE   at '/api/notes/deletenotes

router.delete("/deletenotes/:id", fetchUser, async (req, res) => {
  try {
    // Find a note to be deleted and delete it.

    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json("Note deleted successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
