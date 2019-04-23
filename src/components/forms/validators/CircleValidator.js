export const CircleValidator = values => {
    const errors = {};
    if(!values.name) {
        errors.name = 'サークルは必須項目です！'
    }

    if(!values.penName) {
        errors.penName = 'ペンネームは必須項目です!'
    }

    if(values.twitter && values.twitter.startsWith('@')) {
        errors.twitter = 'TwitterIDは@なしで記入してください';
    }

    if(!values.spaceName) {
        errors.spaceName = 'スペース名は必須項目です!';
    } else if(values.spaceName.indexOf('-') === -1) {
        errors.spaceName = 'スペース名が不正な形式です!';
    }

    return errors;
}
