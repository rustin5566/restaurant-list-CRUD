const express = require('express')
const router = express.Router()
const RestaurantList = require('../../models/restaurant-list')


// 點新增餐廳button routing頁面
router.get('/new', (req, res) => {
  return res.render('new')
})


// 瀏覽特定餐廳
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return RestaurantList.findOne(_id, userId)
    .lean()
    .then(restaurantlists => res.render('detail', { restaurantlists }))
    .catch(error => console.log(error))
})


// 修改資料頁面
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return RestaurantList.findOne(_id, userId)
    .lean()
    .then(restaurantlists => res.render('edit', { restaurantlists }))
    .catch(error => console.log(error))
})

// 接住修改後的資料後重新渲染
router.put('/:id', (req, res) => {
  const { restaurantId } = req.params
  RestaurantList.findByIdAndUpdate(restaurantId, req.body)
    .then(() => res.redirect(`/restaurants/${restaurantId}`))
    .catch(err => console.log(err))
})

// 刪除資料
router.delete('/:restaurantId', (req, res) => {
  const { restaurantId } = req.params
  RestaurantList.findByIdAndDelete(restaurantId)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

// 新增資料
router.post('/', (req, res) => {
const userId = req.user._id

  return RestaurantList.create(req.body, userId)// 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))

})

module.exports = router