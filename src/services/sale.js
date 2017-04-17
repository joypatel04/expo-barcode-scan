'use strict';

import Catalog from './catalog';
import Display from './display';

var priceInCents;
var pendingPurchaseItemPrices = new Set();
   
class Sale {
  
  onBarcode(barcode) {
    var item = {};
    
    if ('' === barcode) {
      return Display.displayEmptyBarcodeMessage();
    }

    priceInCents = Catalog.findPrice(barcode);

    if (priceInCents === null || priceInCents === undefined) {
      return Display.displayProductNotFoundMessage(barcode);
    } else {
      pendingPurchaseItemPrices.add(priceInCents)
      return Display.displayPrice(priceInCents);
    }

  }

  onTotal() {
    var saleInProgress = !(pendingPurchaseItemPrices.size === 0);
    if (!saleInProgress) {
      return Display.displayNoSaleInProgressMessage();
    } else {
      var prices = pendingPurchaseItemPrices.values()
      return Display.displayPurchaseTotal(Display.format(prices.next().value));
    }
  }

  parsePriceInCents(scannedPrice) {
    var price = scannedPrice.replace(/[^\d.-]/g, '');
    return Number(price);
  }

}

module.exports = Sale.prototype;



