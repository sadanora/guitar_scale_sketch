// This file is auto-generated by ./bin/rails stimulus:manifest:update
// Run that command whenever you add a new controller or create them with
// ./bin/rails generate stimulus controllerName

import { application } from "./application";

import FingeringController from "./fingering_controller";
application.register("fingering", FingeringController);

import FingeringFormController from "./fingering_form_controller";
application.register("fingering-form", FingeringFormController);

import TooltipController from "./tooltip_controller";
application.register("tooltip", TooltipController);

import ToastController from "./toast_controller";
application.register("toast", ToastController);
