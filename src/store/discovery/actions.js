import {conoutInfo} from '../conout/actions'
import {createConoutError, checkExposedHeaders} from '../../utils/cors'

export const RETRIEVE_STATUS = 'RETRIEVE_STATUS'
export const RETRIEVE_OUTAGES = 'RETRIEVE_OUTAGES'

const headers = {
  'Accept': 'application/json'
}

export const retrieveStatus = (dataSourceIdx, url, xV, xMinV) => dispatch => {
  const fullUrl = url + '/discovery/status'
  const request = new Request(fullUrl, {
    headers: new Headers({...headers, 'x-v': xV, 'x-min-v': xMinV})
  })
  dispatch(conoutInfo('Requesting retrieveStatus(): ' + fullUrl))
  dispatch({
    type: RETRIEVE_STATUS,
    payload: fetch(request)
      .then(response => {
        if (response.ok) {
          checkExposedHeaders(response, fullUrl, dispatch)
          return response.json()
        }
        throw new Error(`Response not OK. Status: ${response.status} (${response.statusText})`)
      })
      .then(obj => {
        dispatch(conoutInfo(`Received response for ${fullUrl}:`, obj))
        return {idx: dataSourceIdx, response: obj}
      })
      .catch(error => {
        dispatch(createConoutError(error, fullUrl))
      })
  })
}

export const retrieveOutages = (dataSourceIdx, url, xV, xMinV) => dispatch => {
  const fullUrl = url + '/discovery/outages'
  const request = new Request(fullUrl, {
    headers: new Headers({...headers, 'x-v': xV, 'x-min-v': xMinV})
  })
  dispatch(conoutInfo('Requesting retrieveOutages(): ' + fullUrl))
  dispatch({
    type: RETRIEVE_OUTAGES,
    payload: fetch(request)
      .then(response => {
        if (response.ok) {
          checkExposedHeaders(response, fullUrl, dispatch)
          return response.json()
        }
        throw new Error(`Response not OK. Status: ${response.status} (${response.statusText})`)
      })
      .then(obj => {
        dispatch(conoutInfo(`Received response for ${fullUrl}:`, obj))
        return {idx: dataSourceIdx, response: obj}
      })
      .catch(error => {
        dispatch(createConoutError(error, fullUrl))
      })
  })
}
