const { Targetables } = require('@magento/pwa-buildpack')

module.exports = targets => {

    const targetables = Targetables.using(targets);

    const ProductDetailComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail'
    );

    const ShortDescription = ProductDetailComponent.addImport(
        "ShortDescription from '@marcinkwiatkowski/theme/components/ShortDescription'"
    );

    ProductDetailComponent.insertAfterJSX('<section className={classes.title} />', `<${ShortDescription} productSku={productDetails.sku} />`)

}
