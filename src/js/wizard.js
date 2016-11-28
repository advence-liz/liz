"use strict"
/**
 *              <aui-tab>
						<ul class="nav nav-tabs" role="tablist">
							<li role="presentation" class="nav-item nav-itemUnits active">
                            <div class="nav-step">{{index}}</div>
                            <a  class="nav-anchor" href="#">Home</a>
                            </li>
							<li role="presentation" class="nav-item nav-itemUnits">
                            <div class="nav-step">{{index}}</div>
                            <a   class="nav-anchor" href="#">Messages</a>
                            </li>
                            <li role="presentation" class="nav-itemUnits">
                             <div class="nav_step">{{index}}</div>
                              <ul class="" role="tablist">
							    <li role="presentation" class="nav-item"><a  class="nav-anchor" href="#">Home</a></li>
							    <li role="presentation" class="nav-item"><a  class="nav-anchor" href="#">Profile</a></li>
                              </ul>
                            </li>
						</ul>
                       
					</aui-tab>
                        <div class="tab-content">Block one</div>
                        <div class="tab-content">Block two</div>
                        <div class="tab-content">Block three</div>

 */
void function ($, window) {



    $.widget("aui.wizard", $.aui.nav, {
        widgetEventPrefix: 'wizard:',



        _create: function () {
            this._super();
            this.$nav_itemUnits.each(function (index) {
                $(this).find('.nav-step').text(index + 1);
            })

        },
        _refresh: function () {
            this._super();
            this.$nav_itemUnits.each(function (index) {
                $(this).find('.nav-step').text(index + 1);
            })

        }
    })

} ($, window)