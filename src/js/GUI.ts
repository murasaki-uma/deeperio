import GUIParameters from "./GUIParameters";
import * as dat from "dat-gui";
export default class GUI
{
    public gui:dat.GUI;
    public parameters:GUIParameters;
    public rendering:any;
    // public camera:any;
    constructor ()
    {


        // var fizzyText = new FizzyText();
        this.parameters = new GUIParameters;
        console.log(this.parameters);
        // this.gui = new dat.GUI({ load: data, width:400});
        this.gui = new dat.GUI(this.parameters);

        // this.gui.remember();
        this.gui.remember(this.parameters);


        this.rendering = this.gui.addFolder('animation');
        // this.camera = this.gui.addFolder('camera');

        this.init();

    }

    public init()
    {
        this.rendering.add(this.parameters, 'threshold',-30.0,30.0);



    }



};