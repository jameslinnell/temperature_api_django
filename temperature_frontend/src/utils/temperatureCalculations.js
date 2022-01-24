
export const setAverageTemp = (data) => {
    let total = 0;
    data.forEach(element => {
        total = total + element;
    });
    return total / data.length
}

export const setLowestHighest = (data) => {
    const minMaxCurrentData = {
      low: 100.0,
      high: 0.0,
      current: 0.0
    }
    data.forEach((element, index) => {
      if (element < minMaxCurrentData.low) {
        minMaxCurrentData.low = element;
      }
      if (element > minMaxCurrentData.high) {
        minMaxCurrentData.high = element
      }
      if (index === data.length - 1) {
        minMaxCurrentData.current = element
      }
    })
    return minMaxCurrentData;
}