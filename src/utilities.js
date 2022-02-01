export const array_move = (arr, old_index, new_index) => {
    while (old_index < 0) {
        old_index += arr.length;
    }
    while (new_index < 0) {
        new_index += arr.length;
    }
    if (new_index >= arr.length) {
        let k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing purposes
};

export function findGetParameter(parameterName) {
    let result = null,
        tmp = [];
    window.location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

export function payloadMaker(body){
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };
}

export function key_to_date(key){
    let res = key.split("_")[1];
    res = res.slice(0,4) +"-"+ res.slice(4,6) +"-"+ res.slice(6,8);
    res = new Date( Date.parse(res) );
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return res.toLocaleDateString(undefined, options);
}