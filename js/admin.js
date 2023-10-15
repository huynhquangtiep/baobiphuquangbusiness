document.addEventListener("DOMContentLoaded", function() {
    // Thực hiện các tác vụ sau khi tài liệu HTML đã tải xong
    
    // Lấy danh sách sản phẩm từ file JSON
    fetch('products.json')
      .then(response => response.json())
      .then(data => {
        // Xử lý dữ liệu, ví dụ: hiển thị danh sách sản phẩm lên trang
        displayProducts(data);
      })
      .catch(error => {
        console.error('Lỗi khi lấy dữ liệu từ file JSON:', error);
      });
      
    // Gắn sự kiện submit cho form thêm sản phẩm
    const addProductForm = document.getElementById('add-product-form');
    addProductForm.addEventListener('submit', addProduct);
  });
  
  // Hàm hiển thị danh sách sản phẩm lên trang
  function displayProducts(products) {
    const productList = document.getElementById('product-list');
    
    products.forEach(product => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <div>
          <strong>${product.name}</strong>
          <p>${product.description}</p>
          <p>Giá: ${product.price}</p>
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="actions">
          <button onclick="editProduct(${product.id})">Sửa</button>
          <button onclick="deleteProduct(${product.id})">Xóa</button>
        </div>
      `;
      
      productList.appendChild(listItem);
    });
  }
  
  // Hàm thêm sản phẩm mới
  function addProduct(event) {
    event.preventDefault();
    
    // Lấy thông tin sản phẩm từ form
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const image = document.getElementById('image').value;
    
    // Tạo đối tượng sản phẩm mới
    const newProduct = {
      name: name,
      description: description,
      price: price,
      image: image
    };
    
    // Thực hiện thêm sản phẩm vào cơ sở dữ liệu JSON
    fetch('products.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Sản phẩm đã được thêm:', data);
        // Sau khi thêm thành công, làm mới trang để hiển thị danh sách sản phẩm đã cập nhật
        location.reload();
      })
      .catch(error => {
        console.error('Lỗi khi thêm sản phẩm:', error);
      });
  }
  
  // Hàm sửa thông tin sản phẩm
  function editProduct(productId) {
    // Thực hiện các thao tác sửa đổi thông tin sản phẩm trong cơ sở dữ liệu JSON
    // Sử dụng fetch hoặc các phương thức HTTP khác để gửi yêu cầu cập nhật thông tin sản phẩm
    
    // Sau khi sửa thành công, làm mới trang để hiển thị danh sách sản phẩm đã cập nhật
    location.reload();
  }
  
  // Hàm xóa sản phẩm
  function deleteProduct(productId) {
    // Thực hiện xóa sản phẩm khỏi cơ sở dữ liệu JSON
    // Sử dụng fetch hoặc các phương thức HTTP khác để gửi yêu cầu xóa sản phẩm
    
    // Sau khi xóa thành công, làm mới trang để hiển thị danh sách sản phẩm đã cập nhật
    location.reload();
  }