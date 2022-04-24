import { upsert, findById, docToResource } from '@/helpers'
export default {
  setItem (state, { resource, item }) {
    upsert(state[resource], docToResource(item))
  },
  appendPostToThread: makeAppendChildToParentMutation({
    parent: 'threads',
    child: 'posts'
  }),
  appendThreadToForum: makeAppendChildToParentMutation({
    parent: 'forums',
    child: 'threads'
  }),
  appendThreadToUser: makeAppendChildToParentMutation({
    parent: 'users',
    child: 'threads'
  }),
  appendContributorToThread: makeAppendChildToParentMutation({
    parent: 'threads',
    child: 'contributors'
  }),
  appendUnsubscribe (state, { unsubscribe }) {
    state.unsubscribes.push(unsubscribe)
  },
  clearAllUnsubscribes (state) {
    state.unsubscribes = []
  }
}

function makeAppendChildToParentMutation ({ parent, child }) {
  return (state, { childId, parentId }) => {
    const resource = findById(state[parent], parentId)
    if (!resource) {
      console.warn(
        `Appending ${child} ${childId} to ${parent} ${parentId} failed because the parent didn't exist`
      )
      return
    }
    resource[child] = resource[child] || []

    if (!resource[child].includes(childId)) {
      resource[child].push(childId)
    }
  }
}
