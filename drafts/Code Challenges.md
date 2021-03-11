Rent Path 2018

Using React 16, create a "Like/Dislike" component for news articles. The
component should be the default export (use export default)

Requirements:

1. Add a like button

- The content of the like button should be in the following format: "Like| 100",
  where 100 is the total number of likes.
- It should have a 'like-button' class
- Wrap the numbert of likes in a span with a "likes-counter" class
- The initial number of likes in the counter shoud be 100.

2. Add a dislike button

- The content of the dislike button should be in the following format: "Dislike
  | 25", where 25 is the total number of dislikes.
- It should have a "dislike-button" class
- Wrapp the number of dislikes in a span with a "dislikes-counter" class
- The initial number of dislikes in the counter should be 25

3. Users can like an article, by clicking the like button:

- Number of likes should increase by one.
- Like button should have "liked" class in addition to the "like-button" class

4. Users can dislike an article, by clicking the dislike button:

- Number of dislikes should increase by one.
- Dislike button should have "disliked" class in addition to the the
  "dislike-button" class

5. Users can cancel their like by clicking again on the like button;

- Like counder should decrease by one.
- "liked" class should be removed from the like button (you can use the
  `classnames1 tool for that)

6. Users can cancel their dislike by clicking again on the dislike button

- Dislike counter should decrease by one.
- "disliked" class should be removed.

7. Disliking an already liked article cancels the like

- Like counter should decrease by one
- "liked" class should be removed for the liked button
- Not that this is in addition to the steps mentioned in the fourth point.

8. Liking an already disliked article cancels the dislike.

- Dislike counter should decrease by one.
- "disliked" classe should be removed from the dislike button
- Note that this is in addition to the steps mentioned in the third point.

Assessment/Tools

- Only two imports are allowed: react(v16.2.0) and classnames(v2.2.5). Both are
  at the top of the starting code.
- Use the animation below as a reference for your solution
- Design/styling is not assessed and will not affect the score. You should focus
  only on implementing the Requirements
- The "Preview" tab will display your component. you can use it for testing
  purposes

```js
import cx from 'classnames'
import {Component} from 'react'

export default class LikeDislike extends Component {
  constructor(props) {
    super(props)
    this.state = {likes: 0, dislikes: 0}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    this.setState({likes: this.state.likes + 1})
  }

  increment() {}
  decrement() {}

  render() {
    return <>{/* <div>
                    <h2>Like/Dislike</h2>
                </div>
                <style>{`
                    .like-button, .dislike-button {
                        font-size: 1
                    }`
                </style> */}</>
  }
}
```
