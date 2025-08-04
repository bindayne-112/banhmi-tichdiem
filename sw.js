// Tên của bộ nhớ cache
const CACHE_NAME = 'ongkoi-scanner-v2';

// Danh sách các tệp cần được cache lại để ứng dụng hoạt động offline
const urlsToCache = [
  './scanner.html',
  'https://fonts.googleapis.com/css2?family=Quicksand:wght@600;700&display=swap',
  'https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.77/Tone.js',
  'https://i.postimg.cc/1tv3ZfH0/LOGO-1.png'
];

// Sự kiện 'install': được gọi khi Service Worker được cài đặt lần đầu
self.addEventListener('install', event => {
  // Chờ cho đến khi việc cache hoàn tất
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Thêm tất cả các URL vào cache
        return cache.addAll(urlsToCache);
      })
  );
});

// Sự kiện 'fetch': được gọi mỗi khi có một yêu cầu mạng từ trang web
self.addEventListener('fetch', event => {
  event.respondWith(
    // Kiểm tra xem yêu cầu có trong cache không
    caches.match(event.request)
      .then(response => {
        // Nếu tìm thấy trong cache, trả về phản hồi từ cache
        if (response) {
          return response;
        }
        
        // Nếu không, thực hiện yêu cầu mạng thực sự
        return fetch(event.request);
      }
    )
  );
});

// Sự kiện 'activate': dọn dẹp các cache cũ
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
```

Sau khi hoàn thành các bước trên, trang web của bạn sẽ được nâng cấp đáng kể. Khi người dùng truy cập bằng trình duyệt trên điện thoại, họ sẽ nhận được một thông báo mời "Thêm vào màn hình chính", biến trang web của bạn thành một ứng dụng tiện lợi.

Chúc bạn thành cô
