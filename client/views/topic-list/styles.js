export const topicPrimaryStyle = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    textDecoration: 'none',
    color: '#aaa',
  },
  tab: {
    textAlign: 'center',
    display: 'inline-block',
    padding: '0 6px',
    borderRadius: 3,
    marginRight: 10,
    fontSize: '12px',
    flexShrink: 0,
    color: '#aaa',
    backgroundColor: theme.palette.accent.main,
  },
  good: {
    backgroundColor: theme.palette.secondary.main,
  },
  top: {
    color: '#aaa',
    backgroundColor: theme.palette.primary[800],
  },
})

export const topicSecondaryStyle = theme => ({
  root: {
    color: '#aaa',
    display: 'flex',
    alignItems: 'center',
    paddingTop: 3,
    flexWrap: 'wrap',
  },
  count: {
    textAlign: 'center',
    marginRight: 20,
  },
  userName: {
    marginRight: 20,
    color: '#aaa',
  },
  accentColor: {
    color: theme.palette.error.light,
  },
})

export const topicListStyle = () => ({
  root: {
    margin: 24,
    marginTop: 80,
  },
  loading: {
    display: 'flex',
    justifyContent: 'space-around',
  },
})
