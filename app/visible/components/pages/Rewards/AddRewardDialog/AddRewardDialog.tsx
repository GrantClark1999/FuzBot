import React from 'react';
import {
  Button,
  Dialog,
  Grow,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  Divider,
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import classes from './AddRewardDialog.css';

const Transition = React.forwardRef(function Transition(
  {
    children,
    ...restProps
  }: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return (
    <Grow style={{ transformOrigin: '0 0 0' }} timeout={1000} {...restProps}>
      {children}
    </Grow>
  );
});

Transition.defaultProps = {
  children: undefined,
};

type RewardDialogProps = {
  open: boolean;
  canSave: boolean;
  handleClose: () => void;
  handleSave: () => void;
  children?: React.ReactNode;
};

AddRewardDialog.defaultProps = {
  children: undefined,
};

export default function AddRewardDialog({
  open,
  canSave,
  handleClose,
  handleSave,
  children,
}: RewardDialogProps) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={handleClose}
      aria-labelledby="add-reward-dialog-label"
      aria-describedby="add-reward-dialog-description"
    >
      <DialogContent className={classes['add-reward-dialog__flex-container']}>
        <div className={classes['add-reward-dialog__reward-element']}>
          {children}
        </div>
        <div
          id="add-reward-dialog-description"
          className={classes['add-reward-dialog__description-element']}
        >
          <Typography variant="h4" id="add-reward-dialog-label">
            Add A Reward
          </Typography>
          <Divider />
          <Typography variant="body1" id="add-reward-dialog-description">
            To add a reward, keep this menu open and redeem any reward from your
            channel. After redemption, you will see your reward on the left. If
            you wish to change the reward to add, just redeem another one, then
            click &ldquo;Save&rdquo; once you have the correct reward.
          </Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="secondary">
          Close
        </Button>
        <Button
          disabled={!canSave}
          onClick={handleSave}
          variant="contained"
          color="secondary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
