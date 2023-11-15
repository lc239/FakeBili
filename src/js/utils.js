function useGenID(arr) {
    return arr.map((e, i) => Object.assign(e, {id: i + 1}));
}

function useUnit(num, fractionDigits = 1) {
    return num < 10000 ? num : ( num < 100000000 ? (num / 10000).toFixed(fractionDigits) + '万' : (num / 100000000).toFixed(fractionDigits) + '亿')
}

export { useGenID, useUnit }