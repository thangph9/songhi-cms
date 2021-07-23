import { createSchema, list, config } from '@keystone-next/keystone/schema';
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  integer,
  autoIncrement,
  image
} from '@keystone-next/fields';
import { document } from '@keystone-next/fields-document';
export const lists = createSchema({
  User: list({
    ui: {
      listView: {
        initialColumns: ['name', 'posts'],
      },
    },
    fields: {
      name: text({ isRequired: true }),
      email: text({ isRequired: true, isUnique: true }),
      password: password({ isRequired: true }),
      posts: relationship({ ref: 'Post.author', many: true }),
    },
  }),
  Post: list({
    fields: {

      title: text(),
      status: select({
        options: [
          { label: 'Published', value: 'published' },
          { label: 'Draft', value: 'draft' },
        ],
        ui: {
          displayMode: 'segmented-control',
        },
      }),
      short_content: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: true,
        dividers: true,
      }),
      content: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: true,
        dividers: true,
      }),
      image: image({
          isRequired: true,
        }),
      meta_title: text(),
      meta_desc: text({
          defaultValue: '...',
          ui: { displayMode: 'textarea' },
        }),
      fb_post:text({
        defaultValue: 'https://www.facebook.com/henhosonghi',
        isRequired: true
      }),
      publishDate: timestamp(),
      author: relationship({
        ref: 'User.posts',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'email'],
          inlineEdit: { fields: ['name', 'email'] },
          linkToItem: true,
          inlineCreate: { fields: ['name', 'email'] },
        },
      }),
      tags: relationship({
        ref: 'Tag.posts',
        ui: {
          displayMode: 'cards',
          cardFields: ['name'],
          inlineEdit: { fields: ['name'] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ['name'] },
        },
        many: true,
      }),
      orderId: autoIncrement({
         defaultValue: 1000,
         isUnique: true,
         ui: {
           isHidden: true,
         },
      }),
    },
  }),
  Tag: list({
    ui: {
      isHidden: true,
    },
    fields: {
      name: text(),
      group: relationship({
        ref: 'TagGroup.tags',
        many: false,
      }),
      posts: relationship({
        ref: 'Post.tags',
        many: true,
      }),
      meta_title: text(),
      meta_desc: text({
          defaultValue: '...',
          ui: { displayMode: 'textarea' },
        }),
      orderId: autoIncrement({
           defaultValue: 1000,
           isUnique: true,
           ui: {
             isHidden: true,
           },
        }),
    },
  }),
  TagGroup: list({
    fields: {
      name: text(),
      tags: relationship({
        ref: 'Tag.group',
        many: true,
      }),
      meta_title: text(),
      meta_desc: text({
          defaultValue: '...',
          ui: { displayMode: 'textarea' },
      }),
      orderId: autoIncrement({
       defaultValue: 100,
       isUnique: true,
       ui: {
         isHidden: true,
       },
      }),
    },
  })
});
