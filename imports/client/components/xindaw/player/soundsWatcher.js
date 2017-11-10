import {filter, reduce, intersection, indexOf, find, isEqual, each} from 'lodash';

export let soundsWatcher = (props) => {
  // 1 DETECT SOUNDS ADDED
  each(props.array1, sound => {
    let oldSound = find(props.array2, {'_id': sound._id})
    if (!oldSound) {
      if (props.added) {
        // console.log(`${sound.name} added`)
        return props.added(sound)
      }
    }
  })

  // 2 DETECT SOUNDS DELETED
  each(props.array2, sound => {
    let newSound = find(props.array1, {'_id': sound._id})
    if (!newSound) {
      if (props.deleted) {
        // console.log(`${sound.name} deleted`)
        return props.deleted(sound)
      }
    }

    // 3 DETECT SOUNDS UPDATED
    let res = reduce(sound, (result, value, key) => isEqual(value, newSound[key]) ? result : result.concat(key), [])

    if (res.length === 0) return

    if (intersection(['code', 'muted'], res).length > 0)  {
      if (props.updated) {
        // console.log(`${newSound.name} updated, prop ${res[0]} changed`)
        return props.updated(newSound, res[0])
      }
    } else {
      if (props.nothing) {
        // console.log(`${newSound.name} NOT updated, prop ${res[0]} changed`)
        return props.nothing(newSound, res[0])
      }
    }
  })
}
