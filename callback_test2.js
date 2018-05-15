var array = [ ... ]; // An array with some objects
var count = 0, length = array.length;
for( var i = 0; i < array.length; ++i )
{
  API.doSthWithCallbacks( (function() {
    var j = i; // A copy of i only available to the scope of the inner function
    return function() {
      array[j].something = 42;

      ++count;
      if( count == length ) {
        // Code executed only after all the processing tasks have been completed
      }
    }
  })() );
}
