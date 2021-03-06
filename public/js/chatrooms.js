$(function () {
  var roomChannel = io.connect(window.socket_host + '/roomlist');

  roomChannel.on('connect', function () {
    console.log('socket connection established');
  });

  roomChannel.on('room_update', function(rooms) {
    rooms = JSON.parse(rooms);

    var $ul = $('ul.roomlist');
    $ul.html('');

    rooms.forEach(function(room){
      var $li = $("<li>");
      $li.text(room.name);
      $li.attr('data-id', room.id);
      $li.attr('data-createdby', room.createdBy);
      $li.attr('data-cratedat', room.createdAt);

      var $link = $('<a>');
      $link.attr('href', 'room/' + room.id);

      $link.append($li);
      $ul.append($link);
    });
  });

  $('#create').click(function () {
    var $roomNameInput = $('.newRoom');
    var roomName = $roomNameInput.val();
    if(!roomName) {
      alert('Oda ismini giriniz');
      return;
    }

    roomChannel.emit('create_room', { name: roomName });
    $roomNameInput.val('');
  });
});
