<?php

namespace fancy_fields;
use atomar\core\HookReceiver;
use atomar\core\Templator;

class Hooks extends HookReceiver
{
    function hookPage() {
        Templator::$js[] = '/assets/fancy_fields/js/fancy_fields.js';
        Templator::$css[] = '/assets/fancy_fields/css/fancy_fields.css';
    }

    function hookStaticAssets($module)
    {
        return array(
            "/assets/fancy_fields/(?P<path>.*)"=>"assets"
        );
    }
}