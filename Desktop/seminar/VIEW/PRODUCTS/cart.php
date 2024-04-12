<div id="shoppingCartDiv">
  <div id="cart">
    <h2>Shopping Cart</h2>
    <div id="cartContent"></div>
  </div>
  <br>
  <div id="totalDiv"></div>
  <div id="PlaceOrder">
    <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Place Order</button>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Order Placed Successfully</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Your Order has been placed. You will be contacted in about 10 minutes</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
