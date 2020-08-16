# WIP Project

## Minimum Viable Product (MVP) -- Alpha (v0.2.0)
- [X] Login Page
  - [X] User can sign in with their Twitch Account
  - [X] Login page will be skipped if user has already logged in and has credentials

- [ ] Home Page
  - [ ] User can log out of their account
  - [X] User can navigate to other pages/features
  - [ ] User can start/stop listening to Channel Reward redemptions
    - [ ] onRedemption
      - [ ] Store redemption log to redemptions.db
      - [ ] Activate any actions associated with the redeemed reward

- [ ] Rewards Page
  - [ ] User can add a reward by making a temp PubSub listener
    - [ ] 'ADD' opens a modal which gives brief instructions, and shows blank icon of reward
      - [ ] Enabled 'Cancel' button and Disabled 'Save' button
    - [ ] onRedemption -> if userId === channelId
      - [ ] Display redeemed reward instead of blank icon
      - [ ] Enable 'Save' button to save that reward
        - [ ] onSave w/ chosen reward
          - [ ] Stop listener
          - [ ] save reward to [rewards.db]
        - [ ] onRedemption -> if userId === channelId
          - [ ] Replace current reward with new reward (w/ transition?)
            - [ ] Change icon
            - [ ] Changing object that gets saved onSave
        - [ ] onCancel or onClickAway
          - [ ] Stop listener
  - [ ] User can view previously added rewards
  - [ ] User can manage previously added rewards
    - [ ] onRemove: remove reward from [rewards.db]
    - [ ] onEdit: update [rewards.db]
    - [ ] onArrange
      - [ ] Default: Insertion order
      - [ ] User can move around rewards -> update [rewards.db]
      - [ ] View: Sort by Alphabetical Order
      - [ ] View: Sort by Cost

- [ ] Devices Page
  - [ ] User can add a new device
    - [ ] Opens a modal of providers
      - [ ] Enable 'Cancel' button and Disable 'Next' button
      - [ ] onSelect
        - [ ] Enable 'Next' button
      - [ ] onNext w/ chosen provider
        - [ ] Modal transition + Start Discovery
          - [ ] Enable 'Back' button and Disable 'Save' button
          - [ ] Display any devices from the provider on the local network
            - [ ] Show (i) icon on each device for more info
          - [ ] onCancel or onClickAway
            - [ ] Stop listener
          - [ ] onSelect
            - [ ] Enable 'Save' button
          - [ ] onSave w/ chosen device
            - [ ] Stop device listener
            - [ ] save device to [devices.db]
  - [ ] User can view previously added devices
  - [ ] User can manage previously added devices
    - [ ] onRemove: remove device from [devices.db]
    - [ ] onEdit
      - [ ] updated [devices.db]
      - [ ] Triggers update sent to a manager to handle
    - [ ] onArrange
      - [ ] Default: Insertion order
      - [ ] User can move around devices -> updates [devices.db]
      - [ ] View: Sort by Alphabetical Order
      - [ ] View: Sort by Cost

- [ ] Actions Page
  - [ ] User can add a new action
    - [ ] Opens a modal
      - [ ] Enable 'Close' button and Disable 'Save' button
      - [ ] User can select a registered channel reward to link to
        - [ ] Default: Blank channel reward
        - [ ] onSelect
          - [ ] Show rendered reward
          - [ ] Enable 'Save' button
      - [ ] User can customize Action field(s)
        - [ ] Action Name (Default = 'Action-channelRewardName')
      - [ ] User can manage events
        - [ ] onAdd: add event to event list
        - [ ] onRemove: remove event from event list
        - [ ] onArrange
          - [ ] Default: Insertion order
          - [ ] Users can move around events
      - [ ] onSave: update [actions.db]
  - [ ] User can view previously added actions
  - [ ] User can manage previously added actions
    - [ ] onRemove: remove action from [actions.db]
    - [ ] onEdit: update [actions.db]
    - [ ] onArrange
      - [ ] Default: Insertion order
      - [ ] Users can move around actions -> updates [actions.db]

## FuzBot Beta (v0.3.0)

## Full Release (v1.0.0)
- [ ] Add automatic pubsub from websocket notification stream is online/offline.
  - [ ] Requires public webserver
  - [ ] Possibly requires authenticating applications with webserver (public/private keys)

## Event Ideas
  * Device State Change
  * Time Delay
  * End Stream
  * Alt + F4
  * Request / Play Music
  * Giveaway?
  * Send Chat Message / DM
  * Temp Ban User
  * VIP / Temp VIP
  * Highlight Marker
  * Make Clip

## Resources Used
* Electron
* React
* Redux
* NeDB (NoSQL/Mongo-like)
* AWS Lambda & API Gateway
* Webpack
* Typescript / HTML / CSS
* Material-UI
* OIDC + JWT Token Management
* electron-react-boilerplate v1.3.0 to kickstart project
