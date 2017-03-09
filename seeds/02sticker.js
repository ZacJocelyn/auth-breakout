exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('delete from sticker; alter sequence sticker_id_seq restart with 5')
    .then(function () {
      const stickers = [{
        id: 1,
        image_url: 'http://scene7.zumiez.com/is/image/zumiez/pdp_hero/Married-To-The-Mob-Birdie-Sticker-_261461-front.jpg',
        name: 'Middle finger',
        user_id: '1'
      },{
        id: 2,
        image_url: 'http://scene7.zumiez.com/is/image/zumiez/pdp_hero/The-Hundreds-Adam-Bomb-Sticker-_192377-0007-front.jpg',
        name: 'bo-omb!',
        user_id: '2'
      },{
        id: 3,
        image_url: 'http://www.unixstickers.com/image/data/stickers/bower/Bower.sh.png',
        name: 'Bird',
        user_id: '1'
      },{
        id: 4,
        image_url: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSQoCDLTda6IaUhvqmO9IfJmXh71bEKExKoPbk14sAMlV7R7lfbFw',
        name: 'Donut',
        user_id: '2'
      }]
      return knex('sticker').insert(stickers);
    });
};
