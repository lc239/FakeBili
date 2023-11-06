function useGenID(arr) {
    return arr.map((e, i) => Object.assign(e, {id: i + 1}));
}

export { useGenID }