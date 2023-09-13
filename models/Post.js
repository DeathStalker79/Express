const {v4: uuidv4} = require('uuid')
const fs = require('fs')
const path = require('path')

class Post {

    constructor(title, text, userId) {
        this.title = title
        this.text = text
        this.userId = userId
        this.id = uuidv4()
    }

    static all() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'db', 'posts.json'),
                'utf-8',
                (e, content) => {
                    if (e) {
                        reject(e)
                    } else {
                        resolve(JSON.parse(content))
                    }
                }
            )
        })
    }

    async save() {
        const posts = await Post.all()

        posts.push({
            title: this.title,
            text: this.text,
            userId: this.userId,
            id: this.id,
        })

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'db', 'posts.json'),
                JSON.stringify(posts),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })
    }

    static async getById(id) {
        const posts = await Post.all()
        return posts.find((u) => u.id == id)
    }

    static async update(id, data) {
        const posts = await Post.all()
        const idx = posts.findIndex((u) => u.id == id)
        const updatedPost = {
            id: id,
            title: data.title,
            text: data.text,
            userId: data.userId,
        }
        posts[idx] = updatedPost
        new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'db', 'posts.json'),
                JSON.stringify(posts),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })

        return updatedPost
    }

    static async destroy(id) {
        const posts = await Post.all()
        const idx = posts.findIndex((u) => u.id == id)

        posts.splice(idx, 1)
        new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'db', 'posts.json'),
                JSON.stringify(posts),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })
    }
}

module.exports = Post