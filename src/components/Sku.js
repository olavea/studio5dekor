import React from "react";
import classNames from "classnames";

const AttributeOption = ({
  option,
  selectedOption,
  isCheckoutInProgess,
  onChange
}) => {
  const optionClasses = classNames("button", "is-small", {
    "is-focused": option === selectedOption
  });
  return (
    <p className="control">
      <button
        disabled={isCheckoutInProgess}
        onClick={() => onChange(option)}
        className={optionClasses}
      >
        {option}
      </button>
    </p>
  );
};

const AttributeSelection = ({ options, ...props }) => (
  <div className="field is-grouped">
    {options.map(option => (
      <AttributeOption key={option} option={option} {...props} />
    ))}
  </div>
);

const Attributes = ({
  attributes,
  isCheckoutInProgess,
  selectedAttributes,
  onSelectedAttributesChange
}) =>
  Object.keys(attributes).map(attributeKey => (
    <AttributeSelection
      key={attributeKey}
      isCheckoutInProgess={isCheckoutInProgess}
      selectedOption={selectedAttributes[attributeKey]}
      options={attributes[attributeKey]}
      onChange={option => onSelectedAttributesChange([attributeKey], option)}
    />
  ));

const Sku = ({
  sku = {},
  labels = {},
  checkoutMessage,
  selectedAttributes = {},
  isCheckoutInProgess,
  isCheckoutPossible,
  onSelectedAttributesChange,
  onCheckout,
  onClearPaymentMessage
}) => {
  const checkoutButtonClasses = classNames("button", "is-outlined", {
    "is-active": isCheckoutPossible,
    "is-loading": isCheckoutInProgess
  });

  console.log("Sku component sku prop", sku);
  console.log("checkoutMessage", checkoutMessage);

  return (
    <article className="columns is-vertically-centered">
      <div className="column is-4">
        <figure className="image is-square">
          {sku.image && <img alt="product" src={sku.image} />}
        </figure>
      </div>
      <div className="column is-6">
        <h2 className="title">{sku.title}</h2>
        <p className="subtitle id-5">{sku.price}</p>
        <div
          style={{ position: "relative" }}
          className="columns is-vertically-centered"
        >
          <div className="column is-two-thirds">
            {
              <Attributes
                isCheckoutInProgess={isCheckoutInProgess}
                attributes={sku.attributes}
                selectedAttributes={selectedAttributes}
                onSelectedAttributesChange={onSelectedAttributesChange}
              />
            }
          </div>
          <div className="column">
            <div className="field">
              <button
                onClick={() => onCheckout()}
                disabled={!isCheckoutPossible}
                className={checkoutButtonClasses}
              >
                {labels.checkout}
              </button>
            </div>
          </div>
          {checkoutMessage && (
            <div className="is-overlay has-background-white center-content">
              <div className="notification">
                <button
                  onClick={() => onClearPaymentMessage()}
                  className="delete is-small"
                />
                <p>{checkoutMessage}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default Sku;
