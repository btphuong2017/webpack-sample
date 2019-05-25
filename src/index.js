import './styles/scss/main.scss';
import 'bootstrap';
import $ from 'jquery';
import logo from './assets/images/logo.png';
var test = () => {
	console.log('Test Babel');
}
test();
$('.test-jquery').html('Jquery Loaded');
$('.test-jquery').on('click', function () {
	console.log($('button'));
	$('#testModal').modal('show');
});
$('#logo').attr('src', logo);
