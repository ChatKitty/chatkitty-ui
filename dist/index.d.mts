declare class ChatKittyFile {
    type: string;
    url: string;
    name: string;
    contentType: string;
    size: number;
}

declare class Emoji {
    character: string;
    description: string;
    aliases: string[];
    tags: string[];
}

interface BaseUser {
    id: number;
    name: string;
    displayName: string;
    displayPictureUrl: string;
    isGuest: boolean;
    presence: UserPresence;
    properties: unknown;
}
declare class UserPresence {
    status: string;
    online: boolean;
}
declare type User = BaseUser & {
    /** @internal */
    _relays: UserRelays;
};
declare class UserRelays {
    self: string;
    channelMember: string;
}

declare class ReactionSummary {
    emoji: Emoji;
    users: User[];
    count: number;
}

declare type Message = SystemMessage | UserMessage;
declare type SystemMessage = TextSystemMessage | FileSystemMessage;
declare type UserMessage = TextUserMessage | FileUserMessage;
interface BaseMessage {
    id: number;
    type: string;
    channelId: number;
    createdTime: string;
    groupTag?: string;
    reactions?: ReactionSummary[];
    repliesCount?: number;
    properties: unknown;
    /** @internal */
    _relays: MessageRelays;
    /** @internal */
    _actions: MessageActions;
    /** @internal */
    _streams: MessageStreams;
}
declare type BaseTextMessage = BaseMessage & {
    body: string;
    links: MessageLink[];
    mentions?: MessageMention[];
};
declare type BaseFileMessage = BaseMessage & {
    file: ChatKittyFile;
};
declare type BaseUserMessage = BaseMessage & {
    user: User;
};
declare type TextSystemMessage = BaseTextMessage & {
    type: 'SYSTEM_TEXT';
};
declare type FileSystemMessage = BaseFileMessage & {
    type: 'SYSTEM_FILE';
};
declare type TextUserMessage = BaseTextMessage & BaseUserMessage & {
    type: 'TEXT';
};
declare type FileUserMessage = BaseFileMessage & BaseUserMessage & {
    type: 'FILE';
};
declare class MessageLink {
    source: string;
    startPosition: number;
    endPosition: number;
    preview?: MessageLinkPreview;
}
declare class MessageLinkPreview {
    url: string;
    title: string;
    image: MessageLinkPreviewImage;
    description?: string;
    siteName?: string;
}
declare class MessageLinkPreviewImage {
    source: string;
}
declare type MessageMention = ChannelMessageMention | UserMessageMention;
interface BaseMessageMention {
    type: string;
    tag: string;
    startPosition: number;
    endPosition: number;
}
declare type ChannelMessageMention = BaseMessageMention & {
    channel: Channel;
};
declare type UserMessageMention = BaseMessageMention & {
    user: User;
};
declare class MessageRelays {
    self: string;
    channel: string;
    parent?: string;
    readReceipts: string;
    repliesCount: string;
    replies: string;
    reactions: string;
}
declare class MessageActions {
    read: string;
    unread: string;
    reply: string;
    deleteForMe: string;
    delete: string;
    react: string;
    edit: string;
    removeReaction: string;
    updateProperties: string;
}
declare class MessageStreams {
    replies: string;
}

declare type Channel = DirectChannel | PublicChannel | PrivateChannel;
interface BaseChannel {
    id: number;
    name: string;
    creator?: User;
    lastReceivedMessage?: Message;
    createdTime: string;
    properties: unknown;
    /** @internal */
    _relays: ChannelRelays;
    /** @internal */
    _topics: ChannelTopics;
    /** @internal */
    _actions: ChannelActions;
    /** @internal */
    _streams: ChannelStreams;
}
interface GroupChannel extends BaseChannel {
    displayName: string;
}
declare type DirectChannel = BaseChannel & {
    type: 'DIRECT';
    members: User[];
};
declare type PublicChannel = GroupChannel & {
    type: 'PUBLIC';
};
declare type PrivateChannel = GroupChannel & {
    type: 'PRIVATE';
};
declare class ChannelRelays {
    self: string;
    context: string;
    messages: string;
    messagesCount: string;
    lastReceivedMessage: string;
    lastReadMessage: string;
    unread: string;
    members: string;
    threads: string;
    calls: string;
}
declare class ChannelTopics {
    self: string;
    messages: string;
    keystrokes: string;
    typing: string;
    participants: string;
    readReceipts: string;
    reactions: string;
    events: string;
}
declare class ChannelActions {
    message: string;
    keystrokes: string;
    join?: string;
    leave?: string;
    addModerator?: string;
    invite?: string;
    read: string;
    mute: string;
    call: string;
    triggerEvent: string;
    update: string;
    delete: string;
    clearHistory: string;
    hide: string;
    createThread: string;
}
declare class ChannelStreams {
    messages: string;
}

declare type Notification = SystemSentMessageNotification | UserSentMessageNotification | UserRepliedToMessageNotification | UserMentionedNotification | UserMentionedChannelNotification;
interface BaseNotification {
    id: number;
    title: string;
    body: string;
    channel: Channel | null;
    data: unknown;
    muted: boolean;
    createdTime: string;
    readTime: string | null;
}
declare type SystemSentMessageNotification = BaseNotification & {
    data: SystemSentMessageNotificationData;
};
declare type UserSentMessageNotification = BaseNotification & {
    data: UserSentMessageNotificationData;
};
declare type UserRepliedToMessageNotification = BaseNotification & {
    data: UserRepliedToMessageNotificationData;
};
declare type UserMentionedNotification = BaseNotification & {
    data: UserMentionedNotificationData;
};
declare type UserMentionedChannelNotification = BaseNotification & {
    data: UserMentionedChannelNotificationData;
};
declare abstract class NotificationData {
    type: string;
    recipient: User;
}
declare class SystemSentMessageNotificationData extends NotificationData {
    message: Message;
}
declare class UserSentMessageNotificationData extends NotificationData {
    message: Message;
}
declare class UserRepliedToMessageNotificationData extends NotificationData {
    message: Message;
    parent: Message;
}
declare class UserMentionedNotificationData extends NotificationData {
    message: Message;
}
declare class UserMentionedChannelNotificationData extends NotificationData {
    message: Message;
}

interface EventMessage {
    type: string;
    payload: any;
}

declare type Environment = 'production' | 'staging' | 'development' | {
    host: string;
    isSecure: boolean;
};
declare type Theme = 'light' | 'dark';
declare type AuthStrategy = {
    type: string;
} & (UnsecuredAuthStrategy | ParamsAuthStrategy);
interface UnsecuredAuthStrategy {
    type: 'unsecured';
}
interface ParamsAuthStrategy {
    type: 'auth-params';
    params: any;
}
declare type Route = {
    name: string;
} & (DMRoute | ChannelRoute);
interface DMRoute {
    name: 'direct-messages';
    chatUsers: string[];
}
interface ChannelRoute {
    name: 'channel';
    channel: string;
}
interface UserProfile {
    displayName: string;
    displayPicture?: string;
}
interface MenuActionType {
    name: string;
    title: string;
}
interface MenuAction {
    name: string;
    channel: Channel;
}
interface ChatComponentContext {
    locale: string;
    dispatch: (message: EventMessage) => void;
}
declare type ChatComponent = (context: ChatComponentContext) => {
    menuActions?: MenuActionType[];
    onMounted?: () => void;
    channelDetailsHandler?: (channel: Channel) => void;
    menuActionHandler?: (action: MenuAction) => void;
};
interface ChatUiContainer {
    id?: string;
    height?: string;
    width?: string;
}
interface ChatUi {
    widgetId: string;
    username: string;
    environment?: Environment;
    locale?: string;
    container?: ChatUiContainer;
    theme?: Theme;
    authStrategy?: AuthStrategy;
    profile?: UserProfile;
    route?: Route;
    chatComponent?: ChatComponent;
    onNotificationReceived?: (notification: Notification) => void;
}

declare const loadChatUi: (ui: ChatUi) => void;

export { loadChatUi };