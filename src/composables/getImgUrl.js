const getImgUrl = (imgNum) => {
    const idx = Math.floor(Math.random() * imgNum) + 1
    const url = require('@/assets/404/fig' + idx + '.png')
    // console.log(url)

    return url
}

export default getImgUrl