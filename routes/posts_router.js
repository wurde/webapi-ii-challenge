'use strict'

/**
 * Dependencies
 */

const express = require('express')
const db = require('../db/db')

/**
 * Define router
 */

const router = express.Router()

/**
 * Routes
 */

router.get('/', async (req, res) => {
  try {
    let posts = await db.find()

    res.status(200).json(posts)
  } catch(err) {
    console.error(err)
    res.status(500).json({ error: { message: 'The posts information could not be retrieved.' }})
  }
})

router.post('/', async (req, res) => {
  try {
    if (!req.body.title || !req.body.contents) {
      return res.status(400).json({ error: { message: 'Please provide title and contents for the posts.' }})
    }

    let results = await db.insert(req.body)

    if (results.id) {
      let post = await db.findById(results.id)
      res.status(201).json(post)
    } else {
      res.status(400).json({ error: { message: 'No post was created.' }})
    }
  } catch(err) {
    console.error(err)
    res.status(500).json({ error: { message: 'There was an error while saving the post to the database.' }})
  }
})

router.get('/:id', async (req, res) => {
  try {
    let post = await db.findById(req.params.id)

    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({ error: { message: 'The post with the specified ID does not exist.' }})
    }
  } catch(err) {
    console.error(err)
    res.status(500).json({ error: { message: 'The post information could not be retrieved.' }})
  }
})

router.put('/:id', async (req, res) => {
  try {
    let posts = await db.findById(req.params.id)

    if (posts.length > 0) {
      if (!req.body.title || !req.body.contents) {
        res.status(400).json({ errors: { message: 'Please provide title and contents for the post.' }})
      } else {
        await db.update(req.params.id, req.body)

        let posts = await db.findById(req.params.id)
        res.status(200).json(posts[0])
      }
    } else {
      res.status(404).json({ error: { message: 'The post with the specified ID does not exist.' }})
    }
  } catch(err) {
    console.error(err)
    res.status(500).json({ error: { message: 'The post information could not be modified.' }})
  }
})

router.delete('/:id', async (req, res) => {
  try {
    let posts = await db.findById(req.params.id)

    if (posts.length > 0) {
      await db.remove(req.params.id)
    } else {
      res.status(404).json({ error: { message: 'The post with the specified ID does not exist.' }})
    }
  } catch(err) {
    console.error(err)
    res.status(500).json({ error: { message: 'The post could not be removed.' }})
  }
})

router.get('/:id/comments', async (req, res) => {
  try {
    let posts = await db.findById(req.params.id)

    if (posts.length > 0) {
      let comments = await db.findPostComments(req.params.id)
      res.status(200).json(comments)
    } else {
      res.status(404).json({ error: { message: 'The post with the specified ID does not exist.' }})
    }
  } catch(err) {
    console.error(err)
    res.status(500).json({ error: { message: 'The comments information could not be retrieved.' }})
  }
})

router.post('/:id/comments', async (req, res) => {
  try {
    let posts = await db.findById(req.params.id)

    if (posts.length > 0) {
      if (!req.body.text) {
        await db.insertComment(req.body)
        res.status(201).json({ error: { message: 'There was an error while saving the comment to the database.' }})
      } else {
        res.status(400).json({ error: { message: 'Please provide text for the comment.' }})
      }
    } else {
      res.status(404).json({ error: { message: 'The post with the specified ID does not exist.' }})
    }
  } catch(err) {
    console.error(err)
    res.status(500).json({ error: { message: 'There was an error while saving the comment to the database.' }})
  }
})

/**
 * Export router
 */

module.exports = router
