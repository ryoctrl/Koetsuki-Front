export const GoodsValidator = values => {
    const errors = {};
    if(!values.name) {
        errors.name = '作品名は必須項目です！'
    }

    if(!values.price) {
        errors.price = '頒布価格は必須項目です!'
    } else if(values.price < 0) {
        errors.price = '頒布価格は整数で入力してください!'
    }

    return errors;
}
