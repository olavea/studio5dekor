import React, { Component } from "react";
import { join, keys, values, pickBy, mapValues } from "lodash";

const skuToLocalizedPrice = (sku, locale) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: sku.currency
  }).format(sku.price / 100);
};

const productAndSkuToOrderItemDescription = (sku, attributes) => {
  const list = [skuToTitle(sku), ...values(attributes)];

  return join(list, " / ");
};

const skuToTitle = sku => {
  const attributeValues = values(sku.attributes);
  return join(attributeValues, ", ");
};

const productToPossibleMetaAttributes = product => {
  const metaAttributes = pickBy(product.metadata, (value, key) =>
    key.startsWith("attribute_")
  );
  return mapValues(metaAttributes, options =>
    options.split(",").map(option => option.trim())
  );
};

const defaultState = {
  isCheckoutInProgess: false,
  selectedAttributes: {},
  attributes: {},
  checkoutMessage: undefined
};

class StripeSku extends Component {
  constructor(props) {
    super(props);

    const { product = {} } = props;

    this.state = {
      ...defaultState,
      attributes: productToPossibleMetaAttributes(product)
    };
  }

  onSelectedAttributesChange = (type, selectedKey) => {
    const { selectedAttributes = {} } = this.state;

    this.setState({
      selectedAttributes: {
        ...selectedAttributes,
        [type]: selectedKey
      }
    });
  };

  resetSelectedAttributes = () => {
    this.setState({ selectedAttributes: {} });
  };

  isSelectedAttributesValid = () => {
    const { selectedAttributes = {}, attributes = {} } = this.state;

    return keys(attributes).reduce(
      (acc, attributeKey) => acc && !!selectedAttributes[attributeKey],
      true
    );
  };

  onCheckout = () => {
    this.setState({ isCheckoutInProgess: true });

    const { sku = {}, product = {}, labels = {}, onCheckout } = this.props;

    const { selectedAttributes = {} } = this.state;

    const description = productAndSkuToOrderItemDescription(
      sku,
      selectedAttributes
    );

    onCheckout(
      {
        name: product.name,
        amount: sku.price,
        description: description,
        currency: sku.currency,
        billingAddress: !!product.shippable
      },
      {
        currency: sku.currency,
        description: `${product.name}: ${description}`,
        item: {
          type: "sku",
          parent: sku.id,
          quantity: 1
        }
      },
      status => {
        let message = labels.paymentMessageFail;

        if (status.code === "success") {
          message = labels.paymentMessageSuccess;
        } else if (status.code === "out_of_inventory") {
          message = labels.paymentMessageOutOfInventory;
        } else if (status.code === "closed") {
          message = undefined;
        }

        this.setState({
          checkoutMessage: message,
          isCheckoutInProgess: false
        });
      }
    );
  };

  render() {
    const { sku = {}, product = {}, labels = {}, SkuComponent } = this.props;

    console.log("StripeSku Component sku prop", sku);

    const {
      isCheckoutInProgess = false,
      selectedAttributes = {},
      checkoutMessage
    } = this.state;

    const props = {
      sku: {
        title: skuToTitle(sku),
        price: skuToLocalizedPrice(sku),
        attributes: productToPossibleMetaAttributes(product),
        image: sku.image
      },
      labels: labels,
      checkoutMessage: checkoutMessage,
      selectedAttributes: selectedAttributes,
      isCheckoutPossible:
        this.isSelectedAttributesValid() && !isCheckoutInProgess,
      isCheckoutInProgess: isCheckoutInProgess,
      onSelectedAttributesChange: this.onSelectedAttributesChange,
      onCheckout: this.onCheckout,
      onClearPaymentMessage: () => {
        this.setState({
          selectedAttributes: defaultState.selectedAttributes,
          checkoutMessage: undefined
        });
      }
    };

    return <SkuComponent {...props} />;
  }
}

export default StripeSku;
