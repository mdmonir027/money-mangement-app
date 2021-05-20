import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import { connect } from 'react-redux';
import {
  removeTransaction,
  updateTransaction,
} from '../../store/actions/transactionAction';
import EditTransaction from './EditTransaction';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 20,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function Transaction({
  user,
  note,
  amount,
  type,
  id,
  createdAt,
  removeTransaction,
  updateTransaction,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => setExpanded(!expanded);

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant='h5' component='h5'>
          {note}
        </Typography>
        <Typography variant='h6' component='p'>
          {amount} - ({' '}
          <span style={{ color: type === 'income' ? 'green' : 'red' }}>
            {type}
          </span>{' '}
          )
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <IconButton
          aria-label='add to favorites'
          onClick={handleExpandClick}
          aria-expanded={expanded}
        >
          <EditIcon style={{ color: expanded ? '#f44336' : '' }} />
        </IconButton>
        <IconButton aria-label='delete' onClick={() => removeTransaction(id)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <EditTransaction
          note={note}
          amount={amount}
          type={type}
          id={id}
          collapseMenuClose={() => setExpanded(false)}
          updateTransaction={updateTransaction}
        />
      </Collapse>
    </Card>
  );
}

export default connect(null, { removeTransaction, updateTransaction })(
  Transaction
);
