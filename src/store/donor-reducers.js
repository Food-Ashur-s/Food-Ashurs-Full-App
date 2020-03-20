let initialState = { results: [] };

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'GET':
            return payload;
        case 'POST':
            return 'post method';
        case 'PUT':
            return 'put method';
        case 'DELETE':
            return 'delete method';
        default:
            return state;
    }
}