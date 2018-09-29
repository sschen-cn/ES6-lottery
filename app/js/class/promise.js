{
  // 基本定义
  let ajax = function(callback) {
    console.log('执行');
    setTimeout(function() {
      callback && callback.call()
    }, 1000)
  }
  ajax(function() {
    console.log('timeout1');
  })
}

{
  let ajax = function() {
    console.log('执行2');
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve()
      }, 1000);
    })
  }

  ajax().then(function() {
    console.log('promise', 'timeout2');
  })
}

{
  let ajax = function() {
    console.log('执行3');
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve()
      }, 1000);
    })
  }
  ajax()
    .then(function() {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve()
        }, 1000);
      })
    })
    .then(function() {
      console.log('timeout3');
    })
}

{
  let ajax = function(num) {
    console.log('执行4');
    return new Promise(function(resolve, reject) {
      if (num > 5) {
        resolve()
      } else {
        throw new Error('出错了')
      }
    })
  }

  ajax(6).then(function() {
    console.log('log', 6);
  }).catch(function(err) {
    console.log('catch', err);
  })

  ajax(3).then(function() {
    console.log('log', 3);
  }).catch(function(err) {
    console.log('catch', err);
  })
}

{
  // 所有图片加载完再添加到页面
  function loadImg(src) {
    return new Promise((resolve, reject) => {
      let img = document.createElement('img')
      img.src = src
      img.onload = function() {
        resolve(img)
      }
      img.onerror = function(err) {
        reject(err)
      }
    })
  }

  function showImgs(imgs) {
    imgs.forEach(function(img) {
      document.body.appendChild(img)
    })
  }

  Promise.all([
    loadImg('https://rpic.douyucdn.cn/asrpic/180927/5033889_0030_6.jpg/dy1'),
    loadImg('https://rpic.douyucdn.cn/asrpic/180927/241431_0027.jpg/dy1'),
    loadImg('https://rpic.douyucdn.cn/live-cover/appCovers/2018/09/06/534359_20180906211743_small.jpg')
  ]).then(showImgs)
}

{
  // 有一个图片加载完再添加到页面
  function loadImg(src) {
    return new Promise((resolve, reject) => {
      let img = document.createElement('img')
      img.src = src
      img.onload = function() {
        resolve(img)
      }
      img.onerror = function(err) {
        reject(err)
      }
    })
  }

  function showImgs(img) {
    let p = document.createElement('p')
    p.appendChild(img)
    document.body.appendChild(p)
  }

  Promise.race([
    loadImg('https://rpic.douyucdn.cn/asrpic/180927/5033889_0030_6.jpg/dy1'),
    loadImg('https://rpic.douyucdn.cn/asrpic/180927/241431_0027.jpg/dy1'),
    loadImg('https://rpic.douyucdn.cn/live-cover/appCovers/2018/09/06/534359_20180906211743_small.jpg')
  ]).then(showImgs)
}