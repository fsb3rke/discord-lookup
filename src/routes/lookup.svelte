<script lang="ts">

    let username: string;
    let globalName: string;
    let avatarLink: string;
    let bannerLink: string;

    const showData = async () => {
        const inputDataValue: string = (<HTMLInputElement>document.getElementById("inp_id")).value;
        

        try {
            console.log(`http://localhost:2117/api/dclookup?id=${inputDataValue}`);
            
            const response = await fetch(`http://localhost:2117/api/dclookup?id=${inputDataValue}`);
            const data = await response.json()
            console.log(data);

            username = data["username"];
            globalName = data["globalName"];
            avatarLink = data["avatarLink"];
            bannerLink = data["bannerLink"];


        } catch (err) {
            console.error("Fetch Error:", err);
        }
        
    }


</script>

<div>
    <span>Account ID: </span>
    <input type="text" id="inp_id">

    <button id="btn_showData" on:click={() => showData()}>
        Show The Data
    </button>

    <div>{username}</div>
    <div>{globalName}</div>
    <img src="{avatarLink}" alt="">
    <img src="{bannerLink}" alt="">

</div>