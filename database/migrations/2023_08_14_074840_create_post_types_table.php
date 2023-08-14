<?php

use App\Models\PostType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // drop first
        Schema::create('post_types', function (Blueprint $table) {
            $table->uuid('id')->unique()->primary();
            $table->text('name');
            $table->timestamps();
        });

        $this->seed();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post_types');
    }


    // add some default data to the post_types table
    public function seed()
    {
        $enums = PostType::POST_TYPE;
        // create multiple rows using model
        foreach ($enums as $enum) {
            PostType::create([
                'name' => $enum,
            ]);
        }
    }
};
