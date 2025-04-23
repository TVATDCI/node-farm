const = replaceTemplate (temp, product) => {
  let productOutput = temp;
  const replacements = {
    PRODUCTNAME: product.productName,
    IMAGE: product.image,
    FROM: product.from,
    NUTRIENTS: product.nutrients,
    QUANTITY: product.quantity,
    PRICE: product.price,
    DESCRIPTION: product.description,
    ID: product.id,
  },

    for (const [key, value] of Object.entries(replacements)) {
    productOutput = productOutput.replaceAll(`{%{key}%}`, value);
    }

    if (product.organic) {
      productOutput = productOutput.replace("{%NOT_ORGANIC%}", "not-organic");
    }

    return productOutput;
};

export default replaceTemplate;