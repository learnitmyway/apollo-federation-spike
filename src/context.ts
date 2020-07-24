interface Event {
  headers: {
    authorization: string
  }
}

const context = async ({
  event,
}: {
  event: Event
}): Promise<{ token: string }> => {
  const token = event.headers.authorization || ''
  return { token }
}

export default context
