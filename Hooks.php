<?php

namespace fancy_fields;
use atomar\core\HookReceiver;
use atomar\core\Templator;

class Hooks extends HookReceiver
{
    // There are a number of hooks available. here is an example.
    function hookRoute($extension)
    {
        return array(
           // '/api/(?P<api>[a-zA-Z\_-]+)/?(\?.*)?' => 'fancy_fields\controller\Api',
           // '/(\?.*)?' => 'fancy_fields\controller\Index'
       );
    }

    function hookPage() {
        Templator::$js[] = 'assets/fancy_fields/js/fancy_fields.js';
        Templator::$css[] = 'assets/fancy_fields/css/fancy_fields.css';
    }

    function hookStaticAssets($module)
    {
        return array(
            "/assets/fancy_fields/(?P<path>.*)"=>"assets"
        );
    }
}