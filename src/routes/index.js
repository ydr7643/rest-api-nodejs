const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.json({"app":'API para prueba técnica'})
})

module.exports = router;