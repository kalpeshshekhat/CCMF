var array = [ ... ]; // An array with some objects

function callbackClosure(i, callback) {
  return function() {
    return callback(i);
  }
}

for( var i = 0; i < array.length; ++i )
{
  API.doSthWithCallbacks( callbackClosure( i, function(i) {
    array[i].something = 42;
  }) );
}
