
export const renderData = (state) => {
    return(
      <ul class="list-inline">
        <li class="list-inline-item text-primary">24H Low : <span class="fw-bold">{state.lowest.toFixed(1)} &#176;C&nbsp;&nbsp;|&nbsp;&nbsp;</span></li>
        <li class="list-inline-item text-danger">24H High : <span class="fw-bold">{state.highest.toFixed(1)} &#176;C&nbsp;&nbsp;|&nbsp;&nbsp;</span></li>
        <li class="list-inline-item text-muted">24H Avg. : <span class="fw-bold">{state.average.toFixed(1)} &#176;C&nbsp;&nbsp;|&nbsp;&nbsp;</span></li>
        <li class="list-inline-item">Current : <span class="fw-bold">{state.current_temp.toFixed(1)} &#176;C</span></li>
      </ul>
    );
}

export const renderData_no_limit = (state) => {
    return(
      <ul class="list-inline">
        <li class="list-inline-item text-primary">Low : <span class="fw-bold">{state.lowest_no_limit.toFixed(1)} &#176;C&nbsp;&nbsp;|&nbsp;&nbsp;</span></li>
        <li class="list-inline-item text-danger">High : <span class="fw-bold">{state.highest_no_limit.toFixed(1)} &#176;C&nbsp;&nbsp;|&nbsp;&nbsp;</span></li>
        <li class="list-inline-item text-muted">Avg. : <span class="fw-bold">{state.average_no_limit.toFixed(1)} &#176;C&nbsp;&nbsp;|&nbsp;&nbsp;</span></li>
        <li class="list-inline-item">Current : <span class="fw-bold">{state.current_temp.toFixed(1)} &#176;C</span></li>
      </ul>
    );
  }