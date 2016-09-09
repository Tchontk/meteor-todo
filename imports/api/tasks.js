import {
  Meteor
} from 'meteor/meteor';
import {
  Mongo
} from 'meteor/mongo';
import {
  check
} from 'meteor/check';
export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find();
  });
}
Meteor.methods({
  'tasks.insert' (text) {
    check(text, String);
    if (!this.userId) {
      throw new Meteor.Error("No !");
    }
    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username
    });
  },
  'tasks.remove' (taskId) {
    check(taskId, String);
    Tasks.remove(taskId);
  },
  'tasks.setChecked' (taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    Tasks.update(taskId, {
      $set: {
        checked: setChecked
      }
    });
  },
  'tasks.private' (taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);

    const task = Tasks.findOne(taskId);

    if (task.owner !== this.userId) {
      throw new Meteor.Error("Private task");
    }

    Task.Update(taskId, {
      $set: {
        private: setToPrivate
      }
    });
  }
});