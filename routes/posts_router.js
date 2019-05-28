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
    res.status(500).json({ error: { message: 'Server error' }})
  }
})

router.get('/:id', async (req, res) => {
  try {
    let post = await db.findById(req.params.id)

    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({ error: { message: 'Post not found' }})
    }
  } catch(err) {
    console.error(err)
    res.status(500).json({ error: { message: 'Server error' }})
  }
})

router.get('/:id/comments', async (req, res) => {
  try {
    let comments = await db.findPostComments(req.params.id)

    if (comments) {
      res.status(200).json(comments)
    } else {
      res.status(404).json({ error: { message: 'Post not found' }})
    }
  } catch(err) {
    console.error(err)
    res.status(500).json({ error: { message: 'Server error' }})
  }
})

/**
 * Export router
 */

module.exports = router
